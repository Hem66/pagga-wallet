import { FC, ReactNode, createElement } from 'react'

import cx from 'classnames'

import './style.scss'

export type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'

export type Size = '48' | '40' | '42' | '34' | '30' | '24' | '20' | '18' | '16' | '14' | '10'

export type Weight = '700' | '600' | '500' | '400' | '300'


interface TypographyProps {
  tag?: Tag
  size?: Size
  color?: string
  weight?: Weight
  className?: string
  width?: string
  children?: ReactNode
  lineHeight?: string
  textAlign?: string
  textTransform?: string
}

const Typography: FC<TypographyProps> = ({
  className,
  children,
  color,
  width,
  tag = 'div',
  size = '14',
  weight = '400',
  lineHeight,
  textAlign,
  textTransform,
}) => {
  const classes = cx(
    'typography',
    `typography_font-size-${size}`,
    `typography_font-weight-${weight}`,
    className
  )

  return createElement(
    tag,
    { className: classes, style: { color, width, lineHeight, textAlign, textTransform } },
    children
  )
}

export default Typography
