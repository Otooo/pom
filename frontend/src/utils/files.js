

export async function downloadExcel(content, filename = `export.xlsx`) {
    const mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';  
    const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
    
    // se o servidor mandou erro em HTML/JSON e caiu aqui como blob, evita “arquivo corrompido”
	if (blob.type && !blob.type.includes('spreadsheetml')) {
		const text = await blob.text().catch(() => '');
		throw new Error(text || 'Resposta não é um .xlsx');
	}

	const blobUrl = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = blobUrl;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(blobUrl);
}