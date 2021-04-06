import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FotoService } from '../service/foto.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  constructor(public FotoService:FotoService, public router: Router) {}

  async ngOnInit(){
    await this.FotoService.loadFoto();
  }

  goBack(){
    this.router.navigate(["./tabs/tab3"]);
  }
}
