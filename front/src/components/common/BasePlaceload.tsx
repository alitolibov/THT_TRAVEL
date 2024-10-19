const BasePlaceload: React.FC<any> = ({ className }: Record<string, any> ) => {
	
	return (
		<div className={`animate-pulse bg-slate-700 rounded-lg ${className}`}/>
	);
};

export default BasePlaceload;