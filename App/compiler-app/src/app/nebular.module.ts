import { NgModule } from "@angular/core";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import {
  NbCardModule,
  NbTreeGridModule,
  NbIconModule,
  NbInputModule,
  NbThemeModule,
  NbAccordionModule,
  NbTabsetModule,
  NbButtonModule,
  NbLayoutModule,
  NbSelectModule,
  NbListModule,
  NbCheckboxModule,
  NbAlertModule,
  NbBadgeModule } from "@nebular/theme";

@NgModule({
  declarations: [],
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbThemeModule,
    NbAccordionModule,
    NbTabsetModule,
    NbButtonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbListModule,
    NbBadgeModule,
    NbAlertModule,
    NbCheckboxModule,
  ],
  exports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbThemeModule,
    NbAccordionModule,
    NbTabsetModule,
    NbButtonModule,
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbListModule,
    NbBadgeModule,
    NbAlertModule,
    NbCheckboxModule,
  ]
})
export class NebularModule { }
