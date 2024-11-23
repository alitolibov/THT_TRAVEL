import React from 'react';
import { ICategoryTour } from '@/types';
import { getValue } from '@/utils';

interface CategoryWithToursSectionProps {
    category: ICategoryTour;
}

const CategoryWithToursSection: React.FC<CategoryWithToursSectionProps> = ({ category }) => {
    const keyName = getValue('name') as keyof ICategoryTour;
    const categoryName = String(category[keyName]);
    
    return (
        <section>
            <div className={'flex items-center gap-5'}>
                <p className="">{categoryName}</p>
                <div className={'border-t grow border-[var(--main-color-two)]'}/>
                <button>
                    Показать еще
                </button>
            </div>
        </section>
    );
};

export default CategoryWithToursSection;