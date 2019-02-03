import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Dragon } from './Dragon';

@Injectable({
  providedIn: 'root'
})

export class DragonService {
  private readonly dragonMapper = new DragonMapper();
  private readonly ENTITY_NAME = "dragon";

  constructor(private readonly apiService: ApiService) { }

  async get(): Promise<Dragon[]> {
    const result = this.apiService.get(this.ENTITY_NAME);
    const dragons = await result.toPromise<Dragon[]>();
    return dragons.map((item) => this.dragonMapper.fromJSON(item));
  }

  async getDetail(id: string): Promise<Dragon> {
    const result = this.apiService.getDetail(this.ENTITY_NAME, id);
    const dragon = await result.toPromise<Dragon>();
    return this.dragonMapper.fromJSON(dragon);
  }

  async delete(id: string): Promise<any> {
    const result = this.apiService.delete(this.ENTITY_NAME, id);
    return await result.toPromise();
  }
}

class DragonMapper {
  fromJSON(item: Dragon): Dragon {
    return { ...item, createdAt: new Date(item.createdAt) };;
  }
}
