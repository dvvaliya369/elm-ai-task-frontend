import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../store';
import { getProfile, updateProfile } from '../service/profile.service';
import { clearProfile } from '../store/profileSlice';
import { useToast } from './useToast';

export const useProfile = (profileId?: string) => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const { profile, loading, updateLoading, error } = useSelector((state) => state.profile);

  const fetchProfile = useCallback(async () => {
    try {
      await dispatch(getProfile({ profileId }));
    } catch {
      showError('Failed to fetch profile');
    }
  }, [dispatch, profileId, showError]);

  const handleUpdateProfile = useCallback(async (
    firstName?: string, 
    lastName?: string, 
    file?: File
  ) => {
    try {
      const result = await dispatch(updateProfile({ firstName, lastName, file }));
      
      if (updateProfile.fulfilled.match(result)) {
        showSuccess('Profile updated successfully!');
        return true;
      } else {
        showError(result.payload as string || 'Failed to update profile');
        return false;
      }
    } catch {
      showError('Failed to update profile');
      return false;
    }
  }, [dispatch, showSuccess, showError]);

  const clearProfileData = useCallback(() => {
    dispatch(clearProfile());
  }, [dispatch]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    updateLoading,
    error,
    fetchProfile,
    handleUpdateProfile,
    clearProfileData,
  };
};
