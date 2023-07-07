import { useRouter } from 'next/router';
import { LeftNavigation, NavigationGroup, NavigationItem } from '@opencrvs/components';
import { Icon } from '@opencrvs/components/lib/Icon';
// import { NavigationGroup, NavigationItem, } from '@opencrvs/components/lib/SideNavigation'
import { DeclarationIconSmall } from '@opencrvs/components/lib/icons/DeclarationIconSmall'
export default function Navigation() {
    const router = useRouter();
  
    const handleNavigation = (path) => {
      router.push(path);
    };
  
    return (
        <LeftNavigation applicationName="OpenCRVS" applicationVersion="1.1.0" buildVersion="Development">
          <h4>Health</h4>
          <NavigationGroup>
            <NavigationItem icon={() => <DeclarationIconSmall color={'purple'} />} label="MicroServices" />
            <NavigationItem icon={() => <DeclarationIconSmall color={'orange'} />} label="Dependencies" />
          </NavigationGroup>
          <h4>Performance</h4>
          <NavigationGroup>
            <NavigationItem icon={() => <Icon name="Buildings" size="medium" />} label="Memory Usage" />
          </NavigationGroup>
        </LeftNavigation>
    )
        /* <NavigationGroup>
          <NavigationItem
            icon={() => <Icon name="Activity" />}
            label="My environment"
            onClick={() => handleNavigation('/')}
          />
          <NavigationItem
            icon={() => <Icon name="Activity" />}
            label="Token generator"
            onClick={() => handleNavigation('/token')}
          />
        </NavigationGroup> */
    
  }
  