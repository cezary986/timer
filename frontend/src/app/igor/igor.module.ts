import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgorService, IgorConfig, IGOR_CONFIG } from './igor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    IgorService
  ]
})
export class IgorModule {

  public static forRoot(config: IgorConfig): ModuleWithProviders<IgorModule> {
    return {
        ngModule: IgorModule,
        providers: [
            { provide: IGOR_CONFIG, useValue: config }
        ]
    };
}

  public constructor(@Optional() @SkipSelf() parentModule: IgorModule) {
    if (parentModule) {
      throw new Error('IgorModule has already been imported.');
    }
  }
}
