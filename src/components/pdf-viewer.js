import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Iconify from './iconify';

export default function PDFViewer({ documents = [], pagePath = '' }) {
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Filter documents by page path
  const filteredDocuments = documents.filter(doc => 
    doc.page_path === pagePath && doc.is_active !== false
  );

  const handleViewPDF = (document) => {
    setSelectedPDF(document);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPDF(null);
  };

  if (filteredDocuments.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Энэ хуудсанд баримт байхгүй байна.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 2,
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z20,
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <Iconify icon="eva:file-text-fill" sx={{ fontSize: 24, color: 'primary.main' }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  {doc.title}
                </Typography>
                {doc.category && (
                  <Chip 
                    label={doc.category} 
                    size="small" 
                    sx={{ mt: 0.5 }}
                  />
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Iconify icon="eva:eye-fill" />}
                onClick={() => handleViewPDF(doc)}
              >
                PDF харах
              </Button>
              <IconButton
                href={doc.file_url}
                target="_blank"
                size="small"
                title="Download PDF"
              >
                <Iconify icon="eva:download-fill" />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>

      {/* PDF Viewer Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { height: '90vh' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {selectedPDF?.title}
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: '100%' }}>
          {selectedPDF && (
            <iframe
              src={`${selectedPDF.file_url}#toolbar=1&navpanes=1&scrollbar=1`}
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              title={selectedPDF.title}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            href={selectedPDF?.file_url} 
            target="_blank"
            startIcon={<Iconify icon="eva:external-link-fill" />}
          >
            Шинэ цонхонд нээх
          </Button>
          <Button 
            href={selectedPDF?.file_url} 
            download
            startIcon={<Iconify icon="eva:download-fill" />}
          >
            Татах
          </Button>
          <Button onClick={handleCloseDialog}>
            Хаах
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 