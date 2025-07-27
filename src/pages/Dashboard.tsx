
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ModernHeader } from '@/components/ModernHeader';
import { ItemCardNew } from '@/components/ItemCardNew';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { itemService } from '@/services/itemService';
import { Item } from '@/types/item';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, ChevronDown, Loader2 } from 'lucide-react';

export const Dashboard = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentView, setCurrentView] = useState<'all' | 'lost' | 'found'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [itemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, statusFilter, categoryFilter, currentView]);

  useEffect(() => {
    paginateItems();
  }, [filteredItems, currentPage]);

  const fetchItems = async () => {
    try {
      const data = await itemService.getAllItems();
      setItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    // Apply view filter first
    if (currentView !== 'all') {
      filtered = filtered.filter(item => 
        currentView === 'lost' ? item.status === 'LOST' : item.status === 'FOUND'
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const paginateItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedItems(filteredItems.slice(0, endIndex));
  };

  const loadMoreItems = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
    }, 500);
  };

  const handleViewChange = (view: 'all' | 'lost' | 'found') => {
    setCurrentView(view);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setCurrentView('all');
  };

  const categories = [...new Set(items.map(item => item.category))];
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const hasMoreItems = displayedItems.length < filteredItems.length;

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground text-lg">Loading items...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <ModernHeader 
        onViewChange={handleViewChange}
        currentView={currentView}
      />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-primary bg-clip-text text-transparent">
                Lost & Found Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Browse all reported lost and found items • {filteredItems.length} items found
              </p>
            </div>

            {/* Filter Section */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, description, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 rounded-[16px] border-border/30 bg-card/50 backdrop-blur-sm"
                  />
                </div>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="rounded-[16px] border-border/30 h-12 px-6"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                  <ChevronDown 
                    className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                      showFilters ? 'rotate-180' : ''
                    }`} 
                  />
                </Button>
              </div>

              {/* Expandable Filters */}
              {showFilters && (
                <div className="bg-card/50 backdrop-blur-sm rounded-[20px] p-6 border border-border/30 fade-in-up">
                  <div className="flex flex-wrap gap-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px] rounded-[12px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="LOST">Lost</SelectItem>
                        <SelectItem value="FOUND">Found</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[200px] rounded-[12px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button 
                      variant="ghost" 
                      onClick={clearFilters}
                      className="rounded-[12px] text-muted-foreground hover:text-foreground"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}

              {/* Active Filters Display */}
              {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || currentView !== 'all') && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentView !== 'all' && (
                    <Badge variant="secondary" className="rounded-full">
                      View: {currentView === 'lost' ? 'Lost Items' : 'Found Items'}
                    </Badge>
                  )}
                  {searchTerm && (
                    <Badge variant="secondary" className="rounded-full">
                      Search: "{searchTerm}"
                    </Badge>
                  )}
                  {statusFilter !== 'all' && (
                    <Badge variant="secondary" className="rounded-full">
                      Status: {statusFilter}
                    </Badge>
                  )}
                  {categoryFilter !== 'all' && (
                    <Badge variant="secondary" className="rounded-full">
                      Category: {categoryFilter}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Items Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">No items found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search terms or filters</p>
                <Button onClick={clearFilters} variant="outline" className="rounded-[16px]">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                {/* Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {displayedItems.map((item) => (
                    <ItemCardNew key={item.id} item={item} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreItems && (
                  <div className="text-center">
                    <Button
                      onClick={loadMoreItems}
                      disabled={loadingMore}
                      size="lg"
                      className="rounded-[16px] px-8 py-3"
                      variant="outline"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        `Load More (${filteredItems.length - displayedItems.length} remaining)`
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
