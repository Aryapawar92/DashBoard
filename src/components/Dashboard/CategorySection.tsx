
import React from "react";
import { Category } from "../../types/dashboard";
import WidgetCard from "./WidgetCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CategorySectionProps {
  category: Category;
  onAddWidget: () => void;
  onRemoveWidget: (widgetId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  category, 
  onAddWidget, 
  onRemoveWidget 
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <Button variant="outline" size="sm" onClick={onAddWidget} className="flex items-center gap-1">
          <Plus size={16} />
          <span>Add Widget</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.widgets.map((widget) => (
          <WidgetCard 
            key={widget.id} 
            widget={widget} 
            onRemove={() => onRemoveWidget(widget.id)} 
          />
        ))}
        {category.widgets.length === 0 && (
          <div className="col-span-3 p-8 border rounded-md bg-gray-50 text-center">
            <p className="text-gray-500">No widgets in this category.</p>
            <Button 
              variant="link" 
              onClick={onAddWidget}
              className="mt-2"
            >
              Add your first widget
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
