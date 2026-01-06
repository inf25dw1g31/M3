import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent,
  Grid,
  Typography,
  Box,
  Paper,
  LinearProgress,
  Alert,
  Button,
} from '@mui/material';
import { Title, useDataProvider } from 'react-admin';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import BuildIcon from '@mui/icons-material/Build';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const GradientCard = ({ title, value, subtitle, gradient, icon: Icon, percentage }) => (
  <Card 
    sx={{ 
      height: '100%',
      background: gradient,
      color: 'white',
      position: 'productive',
      overflow: 'hidden',
      borderRadius: 3,
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
      }
    }}
  >
    <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box flex={1}>
          <Typography 
            variant="body2" 
            sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700,
              fontSize: '2.8rem',
              mb: 0.5,
            }}
          >
            {value.toLocaleString()}
          </Typography>
          {subtitle && (
            <Typography variant="caption" sx={{ opacity: 0.85 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ fontSize: 40 }} />
        </Box>
      </Box>
      
      {percentage && (
        <Box display="flex" alignItems="center" gap={0.5}>
          <TrendingUpIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {percentage}%
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            vs último mês
          </Typography>
        </Box>
      )}
    </CardContent>
    
    {/* Decorative circles */}
    <Box
      sx={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        zIndex: 0,
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 150,
        height: 150,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        zIndex: 0,
      }}
    />
  </Card>
);

const StatsCard = ({ title, items }) => (
  <Paper 
    elevation={0} 
    sx={{ 
      p: 3, 
      height: '100%',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
      {title}
    </Typography>
    <Box display="flex" flexDirection="column" gap={2}>
      {items.map((item, index) => (
        <Box 
          key={index}
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          sx={{
            pb: index < items.length - 1 ? 2 : 0,
            borderBottom: index < items.length - 1 ? '1px solid' : 'none',
            borderColor: 'divider',
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: `${item.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <item.icon sx={{ fontSize: 24, color: item.color }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {item.label}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {item.subtitle}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: item.color }}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  </Paper>
);

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [stats, setStats] = useState({
    veiculos: 0,
    clientes: 0,
    reservas: 0,
    manutencoes: 0,
    categorias: 0,
    veiculosDisponiveis: 0,
    reservasAtivas: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const [veiculos, clientes, reservas, manutencao, categorias] = await Promise.all([
          dataProvider.getList('veiculos', { 
            pagination: { page: 1, perPage: 1000 }, 
            sort: { field: 'id_veiculo', order: 'ASC' },
            filter: {} 
          }).catch(() => ({ data: [], total: 0 })),
          dataProvider.getList('clientes', { 
            pagination: { page: 1, perPage: 1000 }, 
            sort: { field: 'id_cliente', order: 'ASC' },
            filter: {} 
          }).catch(() => ({ data: [], total: 0 })),
          dataProvider.getList('reservas', { 
            pagination: { page: 1, perPage: 1000 }, 
            sort: { field: 'id_reserva', order: 'ASC' },
            filter: {} 
          }).catch(() => ({ data: [], total: 0 })),
          dataProvider.getList('manutencaos', { 
            pagination: { page: 1, perPage: 1000 }, 
            sort: { field: 'id_manutencao', order: 'ASC' },
            filter: {} 
          }).catch(() => ({ data: [], total: 0 })),
          dataProvider.getList('categorias', { 
            pagination: { page: 1, perPage: 1000 }, 
            sort: { field: 'id_categoria', order: 'ASC' },
            filter: {} 
          }).catch(() => ({ data: [], total: 0 })),
        ]);

        const veiculosDisponiveis = veiculos.data.filter(v => v.estado === 'Disponivel').length;
        const reservasAtivas = reservas.data.filter(r => r.estado === 'ativa').length;

        setStats({
          veiculos: veiculos.total || veiculos.data.length,
          clientes: clientes.total || clientes.data.length,
          reservas: reservas.total || reservas.data.length,
          manutencoes: manutencao.total || manutencao.data.length,
          categorias: categorias.total || categorias.data.length,
          veiculosDisponiveis,
          reservasAtivas,
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        setError('Erro ao carregar dados do dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [dataProvider]);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Title title="Car4Me - Dashboard" />
      
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Bem-vindo ao Car4Me - Visão geral do sistema
        </Typography>
      </Box>

      {/* Loading */}
      {loading && <LinearProgress sx={{ mb: 3, borderRadius: 1 }} />}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Main Stats - Gradient Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <GradientCard 
            title="Vendas Semanais"
            value={stats.reservas}
            subtitle={`${stats.reservasAtivas} reservas ativas`}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            icon={EventIcon}
            percentage={12}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <GradientCard 
            title="Pedidos Semanais"
            value={stats.veiculos}
            subtitle={`${stats.veiculosDisponiveis} disponíveis`}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            icon={DirectionsCarIcon}
            percentage={8}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <GradientCard 
            title="Visitantes Online"
            value={stats.clientes}
            subtitle="Total de clientes"
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            icon={PeopleIcon}
            percentage={15}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <GradientCard 
            title="Manutenções"
            value={stats.manutencoes}
            subtitle="Total realizadas"
            gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
            icon={BuildIcon}
            percentage={5}
          />
        </Grid>
      </Grid>

      {/* Secondary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <StatsCard 
            title="Estatísticas da Frota"
            items={[
              {
                icon: DirectionsCarIcon,
                label: 'Veículos Disponíveis',
                subtitle: 'Prontos para alugar',
                value: stats.veiculosDisponiveis,
                color: '#2567a0ff',
              },
              {
                icon: BuildIcon,
                label: 'Em Manutenção',
                subtitle: 'Fora de serviço',
                value: stats.veiculos - stats.veiculosDisponiveis,
                color: '#f5576c',
              },
              {
                icon: CategoryIcon,
                label: 'Categorias',
                subtitle: 'Tipos de veículos',
                value: stats.categorias,
                color: '#43e97b',
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StatsCard 
            title="Atividade de Reservas"
            items={[
              {
                icon: CheckCircleIcon,
                label: 'Reservas Ativas',
                subtitle: 'Em andamento',
                value: stats.reservasAtivas,
                color: '#43e97b',
              },
              {
                icon: EventIcon,
                label: 'Total de Reservas',
                subtitle: 'Histórico completo',
                value: stats.reservas,
                color: '#667eea',
              },
              {
                icon: AccessTimeIcon,
                label: 'Taxa de Ocupação',
                subtitle: 'Veículos alugados',
                value: stats.veiculos > 0 
                  ? `${Math.round(((stats.veiculos - stats.veiculosDisponiveis) / stats.veiculos) * 100)}%`
                  : '0%',
                color: '#f093fb',
              },
            ]}
          />
        </Grid>
      </Grid>

      {/* Performance Metrics */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Métricas de Performance
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center" p={2}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#667eea', mb: 1 }}>
                {stats.veiculos > 0 ? Math.round((stats.reservas / stats.veiculos) * 10) / 10 : 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Reservas por Veículo
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center" p={2}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#4facfe', mb: 1 }}>
                {stats.clientes > 0 ? Math.round((stats.reservas / stats.clientes) * 10) / 10 : 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Reservas por Cliente
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center" p={2}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#43e97b', mb: 1 }}>
                {stats.veiculos > 0 ? Math.round((stats.manutencoes / stats.veiculos) * 10) / 10 : 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Manutenções por Veículo
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center" p={2}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#f5576c', mb: 1 }}>
                {stats.veiculos > 0 
                  ? `${Math.round(((stats.veiculos - stats.veiculosDisponiveis) / stats.veiculos) * 100)}%`
                  : '0%'
                }
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Taxa de Utilização
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;
