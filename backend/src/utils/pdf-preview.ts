import Canvas from "canvas";
import { strict as invariant } from "assert";
import { getDocument } from "pdfjs-dist/legacy/build/pdf"

type Factory = {
  canvas: Canvas.Canvas | null
  context: Canvas.CanvasRenderingContext2D | null
}

type NonNullableFactory = {
  [K in keyof Factory]: NonNullable<Factory[K]>
}

class NodeCanvasFactory {
  create(width: number, height: number): NonNullableFactory {
    invariant(width > 0 && height > 0, "Invalid canvas size")
    const canvas = Canvas.createCanvas(width, height)
    const context = canvas.getContext("2d")
    return {
      canvas,
      context,
    }
  }

  reset(canvasAndContext: Factory, width: number, height: number): void {
    invariant(canvasAndContext.canvas, "Canvas is not specified")
    invariant(width > 0 && height > 0, "Invalid canvas size")
    canvasAndContext.canvas.width = width
    canvasAndContext.canvas.height = height
  }

  destroy(canvasAndContext: Factory): void {
    invariant(canvasAndContext.canvas, "Canvas is not specified")

    // Zeroing the width and height cause Firefox to release graphics
    // resources immediately, which can greatly reduce memory consumption.
    canvasAndContext.canvas.width = 0
    canvasAndContext.canvas.height = 0
    canvasAndContext.canvas = null
    canvasAndContext.context = null
  }
}

export const getPdfPreview = async (input: Buffer) => {
  const pdfDocument = await getDocument({
    cMapUrl: "../node_modules/pdfjs-dist/cmaps/",
    cMapPacked: true,
    data: input,
  }).promise

  const firstPage = await pdfDocument.getPage(1)
  const viewport = firstPage.getViewport({ scale: 1.0 })

  const canvasFactory = new NodeCanvasFactory()
  const { canvas, context } = canvasFactory.create(
    viewport.width,
    viewport.height
  )

  await firstPage.render({
    canvasContext: context,
    viewport,
    canvasFactory,
  }).promise

  const image = canvas.toBuffer()
  return image
}