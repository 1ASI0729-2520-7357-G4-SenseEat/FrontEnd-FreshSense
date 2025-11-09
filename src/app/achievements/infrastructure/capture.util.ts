import html2canvas from 'html2canvas';

export async function captureElementToPngBlob(el: HTMLElement): Promise<Blob | undefined> {
    // Aumenta la resolución del canvas para una mejor imagen
    const canvas = await html2canvas(el, { backgroundColor: '#ffffff', scale: 2 });
    return new Promise<Blob | undefined>((resolve) => {
        canvas.toBlob((b) => resolve(b ?? undefined), 'image/png', 1.0);
    });
}
