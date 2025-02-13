import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  AppBar, 
  Toolbar,
  Container,
  List,
  ListItem,
  Chip
} from '@mui/material';
import { Send as SendIcon, Chat as ChatIcon } from '@mui/icons-material';
import client from './mqtt';
import styles from './styles';

function App() {
    const [mensagem, setMensagem] = useState('');
    const [historico, setHistorico] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        client.subscribe('meuTopico');

        client.on('connect', () => {
            setConnected(true);
        });

        client.on('message', (topic, message) => {
            const novaMensagem = {
                texto: message.toString(),
                timestamp: new Date().toLocaleTimeString(),
                id: Date.now()
            };
            setHistorico(prev => [...prev, novaMensagem]);
        });

        return () => client.unsubscribe('meuTopico');
    }, []);

    const enviarMensagem = (e) => {
        e.preventDefault();
        if (mensagem.trim()) {
            client.publish('meuTopico', mensagem);
            setMensagem('');
        }
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <ChatIcon sx={{ mr: 2 }} />
                    <Typography variant="h6">
                        Chat MQTT
                    </Typography>
                    <Chip
                        label={connected ? "Conectado" : "Desconectado"}
                        color={connected ? "success" : "error"}
                        sx={{ ml: 'auto' }}
                    />
                </Toolbar>
            </AppBar>

            <Container sx={styles.container}>
                <Paper sx={styles.messageBox}>
                    <List>
                        {historico.map((msg) => (
                            <ListItem key={msg.id} sx={styles.message}>
                                <Typography variant="body1">
                                    {msg.texto}
                                </Typography>
                                <Typography sx={styles.timestamp}>
                                    {msg.timestamp}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                <form onSubmit={enviarMensagem} style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        size="small"
                    />
                    <Button 
                        variant="contained" 
                        endIcon={<SendIcon />}
                        type="submit"
                    >
                        Enviar
                    </Button>
                </form>
            </Container>
        </div>
    );
}

export default App;