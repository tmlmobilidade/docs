import fs from 'fs';
import path from 'path';

/**
 * Gets the actual content folder name (e.g., "Carris Metropolitana")
 */
export function getContentFolderName(): string {
	const contentDir = path.join(process.cwd(), 'content');

	if (!fs.existsSync(contentDir)) {
		throw new Error('Content directory does not exist');
	}

	const entries = fs.readdirSync(contentDir, { withFileTypes: true });
	const folders = entries
		.filter(entry => entry.isDirectory())
		.map(entry => entry.name);

	if (folders.length === 0) {
		throw new Error('No folders found in content directory');
	}

	// Get the first folder (assuming there's one main content folder)
	return folders[0];
}

/**
 * Normalizes folder name for URL usage
 * Converts "Carris Metropolitana" -> "carris-metropolitana"
 */
export function normalizeFolderName(folderName: string): string {
	return folderName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Gets the basePath for Next.js configuration (normalized for URL)
 */
export function getBasePath(): string {
	const isGitHubPages = process.env.GITHUB_PAGES === 'true';

	if (!isGitHubPages) {
		return '';
	}

	const folderName = getContentFolderName();
	const normalized = normalizeFolderName(folderName);
	return `/${normalized}`;
}
