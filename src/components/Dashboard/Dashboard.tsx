
import React, { useState, useEffect } from "react";
import { DashboardData, Category, Widget } from "../../types/dashboard";
import { initialDashboard } from "../../data/initialDashboard";
import CategorySection from "./CategorySection";
import SearchBar from "./SearchBar";
import AddWidgetModal from "./AddWidgetModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialDashboard);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [allWidgets, setAllWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    // Flatten all widgets for search functionality
    const widgets: Widget[] = [];
    dashboardData.categories.forEach(category => {
      category.widgets.forEach(widget => {
        widgets.push({
          ...widget,
          categoryId: category.id
        } as Widget & { categoryId: string });
      });
    });
    setAllWidgets(widgets);
  }, [dashboardData]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredDashboard = (): DashboardData => {
    if (!searchTerm.trim()) return dashboardData;

    return {
      categories: dashboardData.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget => 
          widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          widget.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.widgets.length > 0)
    };
  };

  const addWidget = (categoryId: string, widget: Widget) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: [...category.widgets, widget]
          };
        }
        return category;
      })
    }));
  };

  const removeWidget = (categoryId: string, widgetId: string) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: category.widgets.filter(widget => widget.id !== widgetId)
          };
        }
        return category;
      })
    }));
  };

  const openAddWidgetModal = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      {filteredDashboard().categories.map(category => (
        <CategorySection 
          key={category.id} 
          category={category}
          onAddWidget={() => openAddWidgetModal(category)}
          onRemoveWidget={(widgetId) => removeWidget(category.id, widgetId)}
        />
      ))}
      
      <AddWidgetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddWidget={(widget) => {
          if (selectedCategory) {
            addWidget(selectedCategory.id, widget);
            setIsModalOpen(false);
          }
        }}
        categoryName={selectedCategory?.name || ""}
      />
    </div>
  );
};

export default Dashboard;
