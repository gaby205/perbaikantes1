import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { FotoService } from '../service/foto.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  constructor(public FotoService:FotoService) {}

  async ngOnInit(){
    await this.FotoService.loadFoto();
  }
}
