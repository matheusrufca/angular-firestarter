import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dragon } from '../Dragon';
import { DragonService } from '../dragon.service';
import { DragonForm } from './DragonForm';

const DRAGONS_TYPES = Object.freeze([
  "Amphitere",
  "Drake",
  "Hydra",
  "Eastern",
  "Eastern",
  "Wyvern",
  "Anthropomorphic",
  "Dragon Beasts",
  "Western",
  "Lindworm",
  "Dragonnet",
  "Cockatrice",
]);

const AVAILABLE_STORIES = Object.freeze(["Other"]);

@Component({
  selector: 'edit.dragon',
  templateUrl: './edit.dragon.component.html',
  styleUrls: ['./edit.dragon.component.scss']
})
export class EditDragonComponent implements OnInit {
  public $loading: boolean = false;
  public dragon: Partial<Dragon> = {
    name: "",
    type: "",
    histories: ["Other"]
  };
  public dragonForm: DragonForm;
  public dragonTypeOptions = DRAGONS_TYPES;
  public availableHistories = Array.from(AVAILABLE_STORIES);

  constructor(
    private readonly router: Router, private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly dragonService: DragonService
  ) {
    this.loadForm();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.loadDragon(params.get("id"));
    });
  }

  ngOnInit() { }

  async save() {
    if (!this.dragonForm.valid) return;

    try {
      this.setBusy(true);
      if (this.dragon.id) {
        await this.edit()
      } else {
        await this.create();
      }
      this.navigateToList();
    } catch (error) {
      // TODO: error handling
    }
    finally {
      this.setBusy(false);
    }


  }

  navigateToList(): void {
    this.router.navigate(['/dragons']);
  }

  private async edit(): Promise<any> {
    return await this.dragonService.edit(this.dragon.id, {
      name: this.dragon.name,
      type: this.dragon.type,
      histories: this.dragon.histories
    });
  }

  private async create(): Promise<any> {
    return this.dragonService.create({
      name: this.dragon.name,
      type: this.dragon.type,
      histories: this.dragon.histories
    });
  }

  private loadForm() {
    this.dragonForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      histories: ['Other']
    }) as DragonForm;
  }

  private async loadDragon(id: string): Promise<void> {
    if (!id) return;
    this.setBusy(true);
    try {

      debugger;
      this.dragon = await this.dragonService.getDetail(id);
      this.availableHistories = Array.from(new Set(this.dragon.histories.concat(AVAILABLE_STORIES)));
    } catch (error) {
      // TODO: handle error
      console.log(error);
    } finally {
      this.setBusy(false);
    }
  }

  private setBusy(state: boolean): void {
    this.$loading = state;
  }
}


