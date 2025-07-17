"use client";
import { Text, Button, Flex, Spinner, Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";

interface Food {
  _id: string;
  title: string;
  price: number;
  category: string;
  description?: string;
  img?: string;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function FoodManagement() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setFoods(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch food items');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `RM${price.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Flex direction="column" align="center" justify="center" className="min-h-screen">
        <Spinner size="3" />
        <Text size="3" className="mt-4">Loading food items...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex direction="column" align="center" justify="center" className="min-h-screen p-4">
        <Callout.Root color="red" className="max-w-md">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            Error loading food items: {error}
          </Callout.Text>
        </Callout.Root>
        <Button 
          variant="soft" 
          className="mt-4"
          onClick={fetchFoods}
        >
          Try Again
        </Button>
      </Flex>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <Flex direction="column" gap="4" className="mb-6">
        <Text size="6" weight="bold">Food Management</Text>
        <Text size="3" color="gray">
          Manage your restaurant's menu items
        </Text>
      </Flex>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <Text size="3" weight="bold" color="gray">Image</Text>
                </th>
                <th className="px-6 py-4 text-left">
                  <Text size="3" weight="bold" color="gray">Title</Text>
                </th>
                <th className="px-6 py-4 text-left">
                  <Text size="3" weight="bold" color="gray">Category</Text>
                </th>
                <th className="px-6 py-4 text-left">
                  <Text size="3" weight="bold" color="gray">Price</Text>
                </th>
                <th className="px-6 py-4 text-left">
                  <Text size="3" weight="bold" color="gray">Status</Text>
                </th>
                <th className="px-6 py-4 text-left">
                  <Text size="3" weight="bold" color="gray">Created</Text>
                </th>
                <th className="px-6 py-4 text-left">
                  <Text size="3" weight="bold" color="gray">Actions</Text>
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-gray-50 transition-colors">
                  {/* Image */}
                  <td className="px-6 py-4">
                    {food.img ? (
                      <img 
                        src={food.img} 
                        alt={food.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Text size="2" color="gray">No img</Text>
                      </div>
                    )}
                  </td>
                  
                  {/* Title */}
                  <td className="px-6 py-4">
                    <Flex direction="column" gap="1">
                      <Text size="3" weight="medium">{food.title}</Text>
                      {food.description && (
                        <Text size="2" color="gray" className="max-w-xs truncate">
                          {food.description}
                        </Text>
                      )}
                    </Flex>
                  </td>
                  
                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {food.category}
                    </span>
                  </td>
                  
                  {/* Price */}
                  <td className="px-6 py-4">
                    <Text size="3" weight="medium">
                      {formatPrice(food.price)}
                    </Text>
                  </td>
                  
                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      food.available !== false 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {food.available !== false ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  
                  {/* Created Date */}
                  <td className="px-6 py-4">
                    <Text size="2" color="gray">
                      {food.createdAt ? formatDate(food.createdAt) : 'N/A'}
                    </Text>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <Flex gap="2">
                      <Button size="2" variant="soft">
                        Edit
                      </Button>
                      <Button size="2" variant="soft" color="red">
                        Delete
                      </Button>
                    </Flex>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {foods.length === 0 && (
          <div className="p-8 text-center">
            <Text size="3" color="gray">No food items found</Text>
          </div>
        )}
      </div>
      
      {/* Summary */}
      <Flex justify="between" align="center" className="mt-4">
        <Text size="2" color="gray">
          Total items: {foods.length}
        </Text>
        <Button variant="solid">
          Add New Item
        </Button>
      </Flex>
    </div>
  );
}