import React from 'react';
import ConfirmActionModal from './ConfirmActionModal';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  /** Typed to confirm. Falls back to "delete" for accounts without one yet. */
  username?: string;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  username,
}) => (
  <ConfirmActionModal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    busy={isDeleting}
    title="Delete your account?"
    description={
      <>
        This cannot be undone. Your profile, projects, links and stats will be
        deleted, and <span className="text-white/70">devbio.co/{username || 'yourname'}</span>{' '}
        will stop working.
      </>
    }
    confirmPhrase={username || 'delete'}
    inputLabel="Type your username to confirm"
    confirmLabel="Delete Account"
    busyLabel="Deleting..."
  />
);

export default DeleteAccountModal;
