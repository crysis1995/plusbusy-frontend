
export type PropsWithClassName<T> = {
	className?: string;
} & (T extends never ? never : T);
