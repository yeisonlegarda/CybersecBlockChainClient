import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../services/web3.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  hero:any = {}

  constructor(private heroesService:Web3Service) { }

  ngOnInit() {
  }

  public save() {
    console.log(this.hero.name),
        this.heroesService.createHero(this.hero.name,this.hero.type).then(result=>{
          console.log(result);
        }).catch(err=>{
          console.log(err);
        });

  }

}
