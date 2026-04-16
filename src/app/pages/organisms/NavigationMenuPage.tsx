import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/app/components/ui/navigation-menu'

export function NavigationMenuPage() {
  return (
    <ComponentPageLayout
      title="Navigation Menu"
      description="Horizontal navigation for web applications with dropdown mega-menu support. Use for top-level site navigation."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Horizontal nav with dropdowns',
          preview: (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Finance</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-48">
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block select-none rounded-md p-2 text-sm hover:bg-accent">
                            Maintenance Collection
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block select-none rounded-md p-2 text-sm hover:bg-accent">
                            Expenses
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block select-none rounded-md p-2 text-sm hover:bg-accent">
                            Fund Management
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                    Residents
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                    Reports
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ),
          code: {
            react: `import { NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@aumraa/breathe/components/ui/navigation-menu'

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Finance</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* dropdown items */}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
        Residents
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
          },
        },
      ]}
    />
  )
}
