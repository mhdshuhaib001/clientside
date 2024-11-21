
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFetchCategoriesQuery } from '../../services/apis/userApi';

export default function CategorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: categories } = useFetchCategoriesQuery();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current && categories) {
      const container = scrollContainerRef.current;
      const itemWidth = container.offsetWidth / itemsPerView;
      
      let newIndex;
      if (direction === 'left') {
        newIndex = Math.max(0, currentIndex - 1);
      } else {
        newIndex = Math.min(categories.length - itemsPerView, currentIndex + 1);
      }
      
      setCurrentIndex(newIndex);
      container.scrollTo({
        left: itemWidth * newIndex,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#f5f3e6] p-4 font-serif"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <motion.h2 
            className="text-xl text-gray-800 font-bold"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Category.
          </motion.h2>
          <div className="flex space-x-2">
            <motion.button
              onClick={() => scroll('left')}
              className={`w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 ${
                canScrollLeft 
                  ? 'hover:bg-gray-800 hover:text-white hover:border-gray-800' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              whileHover={canScrollLeft ? { scale: 1.1 } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              className={`w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 ${
                canScrollRight 
                  ? 'hover:bg-gray-800 hover:text-white hover:border-gray-800' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              whileHover={canScrollRight ? { scale: 1.1 } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-hidden scroll-smooth relative"
        >
          <AnimatePresence mode="wait">
            {categories?.map((category, index) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex-none w-[calc(25%-12px)] min-w-[200px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative group">
                  <img 
                    src={category.imageUrl} 
                    alt={category.name} 
                    className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                <div className="p-4">
                  <motion.div 
                    className="w-10 h-10 bg-[#f5f3e6] rounded-full flex items-center justify-center mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img 
                      src={category.iconUrl} 
                      alt={`${category.name} icon`} 
                      className="w-6 h-6"
                    />
                  </motion.div>
                  <h3 className="font-bold text-gray-800 mb-1 truncate">
                    {category.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}