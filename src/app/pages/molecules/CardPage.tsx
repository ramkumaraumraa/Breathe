import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'

export function CardPage() {
  return (
    <ComponentPageLayout
      title="Card"
      description="Surface that groups related information and actions. Cards create visual hierarchy and make content scannable."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <Card className="w-72">
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>Manage your project configuration.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Update your project name, members, and permissions here.</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          ),
          code: {
            react: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@breathe/ui'

<Card>
  <CardHeader>
    <CardTitle>Project Settings</CardTitle>
    <CardDescription>Manage your project.</CardDescription>
  </CardHeader>
  <CardContent>Content here.</CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>`,
          },
        },
      ]}
    />
  )
}
