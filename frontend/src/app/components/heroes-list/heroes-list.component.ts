import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Hero } from '../../types/Hero';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private backend: BackendService) { }

  async ngOnInit(): Promise<void> {
    // Gets a list of heroes to display
    this.heroes = await this.backend.getHeroes();
  }
  
  /**
   * Prompts the user to confirm deletion then deletes the Hero
   * through the backend API
   * @param id the hero's id whom we want to delete
   */
  async onDelete(id: string){
    if(confirm("Are you sure you want to delete this Hero?")){
      await this.backend.deleteHeroById(id).then(res => {
        console.log(res)
      }).catch(err=>{
        if(err.status === 404){
          alert("That hero could not be found");
        }
      });
    }

    this.heroes = await this.backend.getHeroes();
  }
}
