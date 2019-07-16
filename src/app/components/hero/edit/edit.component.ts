import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  mySelectedHero:any={};
  constructor(private activatedRoute:ActivatedRoute,
              private heroesService:Web3Service) {
    this.activatedRoute.params.subscribe(params => {
    this.mySelectedHero = this.getHerosById(params['id']);
    });

  }

  ngOnInit() {
  }

  public getHerosById(id:number):any{
    const herobyId:any = {};
    this.heroesService.getHerosById(id).then(result=>{
      herobyId.Id = id;
      herobyId.name = result[0].toString();
      herobyId.skill = result[1].toString();
      herobyId.type = result[2].toString();
      herobyId.level = result[3].toString();
      herobyId.readyTimer = result[4].toString();
      herobyId.winCount = result[5].toString();
      herobyId.lossCount = result[6].toString();
    }
  ).catch(err=>{
    console.log(err);
  })
  return herobyId;
  }

  public levelUp() {
    this.heroesService.levelUp(this.mySelectedHero.Id).then(result=>{
      console.log(result);
    }
    ).catch(err=>{
      console.log(err);
    })
  }

  public changeName(name){
    console.log(name);
    this.heroesService.changeName(this.mySelectedHero.Id,name).then(result=>{
      console.log(result);
    }).catch(err=>{
      console.log(err);
    })
  }

  public changeSkill(skill:number){
    this.heroesService.changeSkill(this.mySelectedHero.Id,skill).then(result=>{
      console.log(result);
    }).catch(err=>{
      console.log(err);
    })
  }

}
