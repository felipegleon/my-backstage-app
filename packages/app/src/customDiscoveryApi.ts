import { Config } from '@backstage/config';
import { UrlPatternDiscovery } from '@backstage/core-app-api';
import { DiscoveryApi } from '@backstage/core-plugin-api';
 
export class CustomDiscoveryApi implements DiscoveryApi {
  private urlPatternDiscovery: UrlPatternDiscovery | undefined;
  config: Config;
 
  constructor(
    config: Config,
  ) {
    this.config = config;
  }
 
  async getBaseUrl(pluginId: string) {
 

    const baseUrl = this.config.getString(`backend.baseUrl`);
    console.log("##############################");
    console.log("baseUrl", baseUrl);
    console.log("pluginId", pluginId);
    console.log("##############################");
    
    if(pluginId.includes('auth')){
      this.urlPatternDiscovery = UrlPatternDiscovery.compile(
        `${baseUrl}/api/{{ pluginId }}`,
      );
      
    }else{
      this.urlPatternDiscovery = UrlPatternDiscovery.compile(
        `${baseUrl}/api/proxy/{{ pluginId }}`,
      );
      
    }
  
    return this.urlPatternDiscovery.getBaseUrl(pluginId);
  }
 
  static fromConfig(config: Config) {
    return new CustomDiscoveryApi(
      config,
    );
  }
}