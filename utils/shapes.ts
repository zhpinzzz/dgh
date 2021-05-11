import {
  boundsCollide,
  boundsContain,
  pointInBounds,
} from "state/sessions/brush-session"
import {
  Shape,
  Bounds,
  ShapeType,
  CircleShape,
  DotShape,
  RectangleShape,
  Shapes,
  EllipseShape,
  LineShape,
  RayShape,
  LineSegmentShape,
} from "types"
import { intersectCircleBounds } from "./intersections"
import * as vec from "./vec"

type BaseShapeUtils<K extends ShapeType> = {
  getBounds(shape: Shapes[K]): Bounds
  hitTest(shape: Shapes[K], test: number[] | Bounds): boolean
  rotate(shape: Shapes[K]): Shapes[K]
  translate(shape: Shapes[K]): Shapes[K]
  scale(shape: Shapes[K], scale: number): Shapes[K]
  stretch(shape: Shapes[K], scaleX: number, scaleY: number): Shapes[K]
}

/* ----------------------- Dot ---------------------- */

const DotUtils: BaseShapeUtils<ShapeType.Dot> = {
  getBounds(shape) {
    const {
      point: [cx, cy],
    } = shape

    return {
      minX: cx - 2,
      maxX: cx + 2,
      minY: cy - 2,
      maxY: cy + 2,
      width: 4,
      height: 4,
    }
  },

  hitTest(shape, test) {
    if ("minX" in test) {
      return pointInBounds(shape.point, test)
    }
    return vec.dist(shape.point, test) < 4
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* --------------------- Circle --------------------- */

const CircleUtils: BaseShapeUtils<ShapeType.Circle> = {
  getBounds(shape) {
    const {
      point: [cx, cy],
      radius,
    } = shape

    return {
      minX: cx - radius,
      maxX: cx + radius,
      minY: cy - radius,
      maxY: cy + radius,
      width: radius * 2,
      height: radius * 2,
    }
  },

  hitTest(shape, test) {
    if ("minX" in test) {
      const bounds = CircleUtils.getBounds(shape)
      return (
        boundsContain(bounds, test) ||
        intersectCircleBounds(shape.point, shape.radius, bounds).length > 0
      )
    }
    return vec.dist(shape.point, test) < 4
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* --------------------- Ellipse -------------------- */

const EllipseUtils: BaseShapeUtils<ShapeType.Ellipse> = {
  getBounds(shape) {
    return {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
      width: 0,
      height: 0,
    }
  },

  hitTest(shape) {
    return true
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* ---------------------- Line ---------------------- */

const LineUtils: BaseShapeUtils<ShapeType.Line> = {
  getBounds(shape) {
    return {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
      width: 0,
      height: 0,
    }
  },

  hitTest(shape) {
    return true
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* ----------------------- Ray ---------------------- */

const RayUtils: BaseShapeUtils<ShapeType.Ray> = {
  getBounds(shape) {
    return {
      minX: Infinity,
      minY: Infinity,
      maxX: Infinity,
      maxY: Infinity,
      width: Infinity,
      height: Infinity,
    }
  },

  hitTest(shape) {
    return true
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* ------------------ Line Segment ------------------ */

const LineSegmentUtils: BaseShapeUtils<ShapeType.LineSegment> = {
  getBounds(shape) {
    return {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
      width: 0,
      height: 0,
    }
  },

  hitTest(shape) {
    return true
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* -------------------- Rectangle ------------------- */

const RectangleUtils: BaseShapeUtils<ShapeType.Rectangle> = {
  getBounds(shape) {
    const {
      point: [x, y],
      size: [width, height],
    } = shape

    return {
      minX: x,
      maxX: x + width,
      minY: y,
      maxY: y + height,
      width,
      height,
    }
  },

  hitTest(shape) {
    return true
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

const shapeUtils: { [K in ShapeType]: BaseShapeUtils<K> } = {
  [ShapeType.Dot]: DotUtils,
  [ShapeType.Circle]: CircleUtils,
  [ShapeType.Ellipse]: EllipseUtils,
  [ShapeType.Line]: LineUtils,
  [ShapeType.Ray]: RayUtils,
  [ShapeType.LineSegment]: LineSegmentUtils,
  [ShapeType.Rectangle]: RectangleUtils,
}

export default shapeUtils
