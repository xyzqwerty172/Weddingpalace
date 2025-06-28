"use client";

import { useState, useEffect } from "react";
import { useRouter } from "src/routes/hooks";
import { AuthGuard } from "src/auth/guard";
import MainLayout from "src/layouts/main";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { format } from "date-fns";

export default function AdminDashboardView() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = async (pageNum = 0) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news?type=null&page=${pageNum}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data.body.blogs);
        setTotalPages(data.body.pageCount);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleEdit = (postId) => {
    router.push(`/news/update?id=${postId}`);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const getPostTypeLabel = (type) => {
    return type === 0 ? "Мэдээлэл" : "Мэдээ";
  };

  const getPostTypeColor = (type) => {
    return type === 0 ? "info" : "success";
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "yyyy-MM-dd HH:mm");
    } catch {
      return "N/A";
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "N/A";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (loading) {
    return (
      <AuthGuard>
        <MainLayout>
          <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Container>
        </MainLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <MainLayout>
        <Container sx={{ mt: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Админ хяналтын самбар
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Бүх нийтлэлүүдийг удирдах
            </Typography>
          </Box>

          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "grey.50" }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Гарчиг</strong></TableCell>
                  <TableCell><strong>Дэд гарчиг</strong></TableCell>
                  <TableCell><strong>Төрөл</strong></TableCell>
                  <TableCell><strong>Төлөв</strong></TableCell>
                  <TableCell><strong>Огноо</strong></TableCell>
                  <TableCell><strong>Үйлдэл</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id} hover>
                    <TableCell>{post.id}</TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {truncateText(post.title, 50)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Typography variant="body2" color="text.secondary">
                        {truncateText(post.subtitle, 40)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getPostTypeLabel(post.type)}
                        color={getPostTypeColor(post.type)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={post.is_published ? "Нийтлэгдсэн" : "Ноорог"}
                        color={post.is_published ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(post.createdDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEdit(post.id)}
                        sx={{ mr: 1 }}
                      >
                        Засах
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}

          {posts.length === 0 && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Нийтлэл олдсонгүй
              </Typography>
            </Box>
          )}
        </Container>
      </MainLayout>
    </AuthGuard>
  );
}