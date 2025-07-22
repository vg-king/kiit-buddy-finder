import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: string[]) => void;
}

const categories = ["Electronics", "Books", "Clothing", "Keys", "Documents", "Sports", "Other"];
const timeFilters = ["Today", "This Week", "This Month", "All Time"];
const statusFilters = ["Lost", "Found"];

export const SearchBar = ({ onSearch, onFilterChange }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterToggle = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    onFilterChange([]);
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for lost or found items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-12 h-14 rounded-3xl bg-gradient-card border-border/50 text-foreground placeholder:text-muted-foreground focus:shadow-gentle transition-all duration-300"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-3xl"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => handleFilterToggle(filter)}
            >
              {filter}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Options */}
      {showFilters && (
        <div className="card-soft p-6 space-y-4 fade-in-up">
          <div>
            <h4 className="font-medium mb-3 text-foreground">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={activeFilters.includes(category) ? "default" : "outline"}
                  className="cursor-pointer transition-all duration-200 hover:scale-105"
                  onClick={() => handleFilterToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-foreground">Time</h4>
            <div className="flex flex-wrap gap-2">
              {timeFilters.map((time) => (
                <Badge
                  key={time}
                  variant={activeFilters.includes(time) ? "default" : "outline"}
                  className="cursor-pointer transition-all duration-200 hover:scale-105"
                  onClick={() => handleFilterToggle(time)}
                >
                  {time}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-foreground">Status</h4>
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((status) => (
                <Badge
                  key={status}
                  variant={activeFilters.includes(status) ? "default" : "outline"}
                  className="cursor-pointer transition-all duration-200 hover:scale-105"
                  onClick={() => handleFilterToggle(status)}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};