import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { User } from '../../entities/user';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_User } from '../../contracts/user/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastr: CustomToastrService) {


  }
  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }
      , user);
    debugger
    return await firstValueFrom(observable) as Create_User
  }


}
