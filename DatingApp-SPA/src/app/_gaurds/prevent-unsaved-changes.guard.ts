import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsaveChanges implements CanDeactivate<MemberEditComponent> {
canDeactivate(compoment: MemberEditComponent) {
    if(compoment.editForm.dirty) {
        return confirm('Are you sure you want to exit form.');
    }
    return true;
}

}
