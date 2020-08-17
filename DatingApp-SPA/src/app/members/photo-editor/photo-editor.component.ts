import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { environment } from './../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { Photo } from './../../_models/photo';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
@Input() photos : Photo[];
uploader:FileUploader;
hasBaseDropZoneOver:boolean;
baseUrl = environment.apiUrl;

response:string;

  constructor(private authService: AuthService, private alert: AlertifyService, private userService: UserService ) {
    console.log(this.photos);
   }

  ngOnInit() {
    this.initializeUploader();
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader ({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      maxFileSize: 5*1020*1024
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;} ;

    this.uploader.onSuccessItem = (item, response,status,headers) => {
      if(response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        }
        this.photos.push(photo);
      }
    };
  }

  deletePhoto(id: number) {
    this.alert.confirm("Are you sure you want to delete photo?" , () => {
      this.userService.deletePhoto(id, this.authService.decodedToken.nameid).subscribe(() =>{
        this.photos.splice(this.photos.findIndex(p => p.id == id),1);
        this.alert.success("Photo was successfully deleted!!");
      }, error => {
        this.alert.error("error");
      });
    });
  }


}
