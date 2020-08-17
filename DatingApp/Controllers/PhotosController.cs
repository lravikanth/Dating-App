using AutoMapper;
using Microsoft.Extensions.Options;
using DatingApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DatingApp.Helpers;
using CloudinaryDotNet;
using System.Threading.Tasks;
using DatingApp.Dtos;
using System.Security.Claims;
using CloudinaryDotNet.Actions;
using DatingApp.Models;
using System.Linq;

namespace DatingApp.Controllers
{
    [Authorize]
    [Route("api/users/{userid}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinaySettings> _cloudinaryConfig;
        private  Cloudinary _cloudinary;
        public PhotosController(IDatingRepository repository, IMapper mapper, IOptions<CloudinaySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repository = repository;
            Account acc = new Account{
                ApiKey = _cloudinaryConfig.Value.ApiKey,
                ApiSecret = _cloudinaryConfig.Value.ApiSecret,
                Cloud = _cloudinaryConfig.Value.CloudName
            };
            _cloudinary = new Cloudinary(acc);
        }
        [HttpGet("{id}",Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id){
            var photoFromRepo = await _repository.GetPhoto(id);
            var photo = _mapper.Map<PhotoforReturnDto>(photoFromRepo);
            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm] PhotoForCreationDto photoDto) {
              
              if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

              var userFromRepo = await this._repository.GetUser(userId);  
              var file = photoDto.file;
              var uploadResult = new ImageUploadResult();

              if (file.Length > 0)
              {
                  using (var fileStream = file.OpenReadStream()) { 
                    var uploadParams = new ImageUploadParams {
                        File = new FileDescription(file.Name,fileStream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);

                  }
              }
              photoDto.Url = uploadResult.Url.ToString();
              photoDto.PublicId = uploadResult.PublicId;
              var photo = _mapper.Map<Photo>(photoDto);
              
              if(!userFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;

                userFromRepo.Photos.Add(photo);

              if (await _repository.SaveAll())
              {
                  var photoToReturn = _mapper.Map<PhotoforReturnDto>(photo); // since save is successful .. we will have id created.
                  return CreatedAtRoute("GetPhoto", new {userId=userId, id = photo.Id},photoToReturn);
              }

              throw new System.Exception("Photo upload Failed!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id) {
              if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

              var userFromRepo = await this._repository.GetUser(userId);  
              if(!userFromRepo.Photos.Any(p => (p.Id == id)))
                return Unauthorized();

              var photoFromRepo =await _repository.GetPhoto(id);  
              if( photoFromRepo.IsMain == true )
                return BadRequest("Cannot not delete main photo!!");

              if (photoFromRepo.PublicID != null){
                var deleteParams = new DeletionParams(photoFromRepo.PublicID);  
                var result = _cloudinary.Destroy(deleteParams);  

                if(result.Result == "ok")
                   _repository.Delete(photoFromRepo);
              } else{
                  _repository.Delete(photoFromRepo);
              }

              if(await _repository.SaveAll())  
                return Ok();

             return BadRequest("Cannot delete Photo!!");   
        }

    }
}