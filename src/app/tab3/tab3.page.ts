import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../service/foto.service';

export interface fileFoto{
  name : string; //filepath
  path : string; //webviewPath
}
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  urlImageStorage : string[] = []

  constructor(
    private afstorage : AngularFireStorage,
    public fotoService : FotoService
  ) { }

  async ngOnInit() {
    await this.fotoService.loadFoto(); 
  }

  async ionViewDidEnter(){
    await this.fotoService.loadFoto(); 
    this.tampilkanData();
  }


  hapusFoto(){
    var refImage = this.afstorage.storage.ref('imgStorage');
    refImage.listAll()
    .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.delete().then(() => {
            //menampilkan data
            this.tampilkanData()
          });
        });
    }).catch((error) => {
      console.log(error);
    });

  }

  tampilkanData() {
    this.urlImageStorage=[];
    var refImage = this.afstorage.storage.ref('imgStorage');
    refImage.listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then(url => {
            this.urlImageStorage.unshift(url)
        })
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  uploadFoto(){
    this.urlImageStorage=[];
    for  ( var index in this.fotoService.dataFoto){
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      
      this.afstorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afstorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
           this.urlImageStorage.unshift(url)
           console.log(url);
        })
      })

    }

  }

}
