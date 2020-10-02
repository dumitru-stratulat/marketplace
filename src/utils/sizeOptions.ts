
const array = [];
for (let index = 33; index < 50; index++) {
  array.push({
    value: index.toString(),
    label: index.toString()
  })
}
export const sizeOptions = [
  {
    value: 'wear',
    label: 'Haine',
    children: [
      {
        value: 'xs',
        label: 'XS'
      },
      {
        value: 's',
        label: 'S'
      },
      {
        value: 'm',
        label: 'M'
      },
      {
        value: 'l',
        label: 'L'
      },
      {
        value: 'xl',
        label: 'XL'
      },
      {
        value: 'xxl',
        label: 'XXL'
      },
      {
        value: 'xxxl',
        label: 'XXXL'
      }
    ]
  },
  {
    value: 'shoes',
    label: 'Incaltaminte',
    children: array
  },
]