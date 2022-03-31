import * as React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';

const KendoDialog = ({ visible, toggleDialog, title, children }) => {
  return (
    visible && (
      <Dialog title={title} onClose={toggleDialog} width={400} height={500}>
        {children}
      </Dialog>
    )
  );
};

export default KendoDialog;
