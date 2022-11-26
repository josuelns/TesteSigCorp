import { ValidationComposite } from '@/main/composites'
import { ValidationBuilder as Builder } from '@/main/builders'

export const makeAddAppointmentValidation = (): ValidationComposite => ValidationComposite.build([
  ...Builder.field('name').minLentgh(1).maxLentgh(60).required().build()
])
