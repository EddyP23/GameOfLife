import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { GridBoxComponent } from './components/gridbox/gridbox.component'

@NgModule({
    declarations: [
        AppComponent,
        GridBoxComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class AppModuleShared {
}
