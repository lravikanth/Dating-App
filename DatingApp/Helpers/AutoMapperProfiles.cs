using System.Linq;
using AutoMapper;
using DatingApp.Dtos;
using DatingApp.Models;

namespace DatingApp.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Models.User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl,opts => opts.MapFrom(src =>
                src.Photos.FirstOrDefault(p => p.IsMain == true).Url))
                .ForMember(dest => dest.Age, opts => opts.MapFrom(src =>
                src.DateOfBirth.CalculateAge()));
            
            CreateMap<Models.User, UserForDetailsDto>()  
            .ForMember(dest => dest.PhotoUrl,opts => opts.MapFrom(src =>
            src.Photos.FirstOrDefault(p => p.IsMain == true).Url))
            .ForMember(dest => dest.Age, opts => opts.MapFrom(src =>
                src.DateOfBirth.CalculateAge()));
            CreateMap<Models.Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto,Models.User>();
            CreateMap<Photo,PhotoforReturnDto>();
            CreateMap<PhotoForCreationDto,Photo>();
            CreateMap<UserForRegisterDto,User>();
        }
    }
}