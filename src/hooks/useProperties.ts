import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyApi } from '../services';
import type { PropertyFilters, Property } from '../types';

export const useProperties = (filters?: PropertyFilters) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertyApi.getProperties(filters),
  });
};

export const useProperty = (id: number) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyApi.getPropertyById(id),
    enabled: !!id,
  });
};

export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: ['properties', 'featured'],
    queryFn: () => propertyApi.getFeaturedProperties(),
  });
};

export const useLatestProperties = () => {
  return useQuery({
    queryKey: ['properties', 'latest'],
    queryFn: () => propertyApi.getLatestProperties(),
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Property>) => propertyApi.createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Property> }) => propertyApi.updateProperty(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => propertyApi.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};
