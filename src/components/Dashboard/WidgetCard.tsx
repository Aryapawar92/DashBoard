
import React from "react";
import { Widget } from "../../types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DonutChart, ProgressBar } from "./WidgetVisualizations";

interface WidgetCardProps {
  widget: Widget;
  onRemove: () => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widget, onRemove }) => {
  const renderWidgetContent = () => {
    switch (widget.type) {
      case "donut-chart":
        return <DonutChart data={widget.data} />;
      case "progress-chart":
        return <ProgressBar data={widget.data} colorful />;
      case "progress-bar":
        return <ProgressBar data={widget.data} />;
      case "info":
      default:
        return <div className="flex items-center justify-center h-40 text-gray-500">{widget.content}</div>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <CardTitle className="text-md font-medium">{widget.name}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onRemove} className="h-8 w-8 p-0">
          <X size={16} />
        </Button>
      </CardHeader>
      <CardContent>{renderWidgetContent()}</CardContent>
    </Card>
  );
};

export default WidgetCard;
