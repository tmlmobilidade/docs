import { PathUtils } from 'fumadocs-core/source';

export function getName(filePath: string) {
	return PathUtils.basename(filePath, PathUtils.extname(filePath));
}
