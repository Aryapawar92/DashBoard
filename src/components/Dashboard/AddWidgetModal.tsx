
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Widget } from "../../types/dashboard";

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (widget: Widget) => void;
  categoryName: string;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
  isOpen,
  onClose,
  onAddWidget,
  categoryName
}) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetContent, setWidgetContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!widgetName.trim()) return;

    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      name: widgetName,
      content: widgetContent || "No content provided",
      type: "info"
    };

    onAddWidget(newWidget);
    resetForm();
  };

  const resetForm = () => {
    setWidgetName("");
    setWidgetContent("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Widget to {categoryName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="widget-name" className="text-right">
                Widget Name
              </Label>
              <Input
                id="widget-name"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="widget-content" className="text-right">
                Widget Content
              </Label>
              <Textarea
                id="widget-content"
                value={widgetContent}
                onChange={(e) => setWidgetContent(e.target.value)}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Widget</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetModal;
