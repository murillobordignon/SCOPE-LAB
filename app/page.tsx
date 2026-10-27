'use client';

import { useState, FormEvent, CSSProperties } from 'react';

interface Laboratorio {
  id: number;
  nome: string;
  status: 'livre' | 'ocupado';
  professor: string;
  disciplina: string;
  horario: string;
  obs: string;
}

export default function ScopeLabHome() {
  const [tipoUsuario, setTipoUsuario] = useState<string>('');
  const [senhaInput, setSenhaInput] = useState<string>('');
  const [mostrarModalSenha, setMostrarModalSenha] = useState<boolean>(false);
  const [erroSenha, setErroSenha] = useState<string>('');
  const [mostrarCreditos, setMostrarCreditos] = useState<boolean>(false);

  const [labs, setLabs] = useState<Laboratorio[]>([
    { id: 1, nome: 'Lab 01', status: 'ocupado', professor: 'Prof. Romildo', disciplina: 'TICS I', horario: '07:30 - 09:10', obs: 'Trazer notebook' },
    { id: 2, nome: 'Lab 02', status: 'livre', professor: '', disciplina: '', horario: '', obs: 'Sala livre' },
    { id: 3, nome: 'EAD', status: 'ocupado', professor: 'Prof. Carlos Alberto', disciplina: 'WEB I', horario: '07:30 - 09:10', obs: 'Aula prática' }
  ]);

  const [novoNome, setNovoNome] = useState<string>('');
  const [mostrarModalNovoLab, setMostrarModalNovoLab] = useState<boolean>(false);

  const [labSelecionadoId, setLabSelecionadoId] = useState<number | null>(null);
  const [profInput, setProfInput] = useState<string>('');
  const [discInput, setDiscInput] = useState<string>('');
  const [horarioInput, setHorarioInput] = useState<string>('');
  const [obsInput, setObsInput] = useState<string>('');

  function logarComoAluno() {
    setTipoUsuario('aluno');
  }

  function tentarLogarRepresentante(e: FormEvent) {
    e.preventDefault();
    if (senhaInput === '123') {
      setTipoUsuario('representante');
      setMostrarModalSenha(false);
      setSenhaInput('');
      setErroSenha('');
    } else {
      setErroSenha('Senha incorreta! Tente 123');
    }
  }

  function deslogar() {
    setTipoUsuario('');
  }

  function adicionarLab(e: FormEvent) {
    e.preventDefault();
    if (novoNome === '') return;

    const novoObjeto: Laboratorio = {
      id: Date.now(),
      nome: novoNome,
      status: 'livre',
      professor: '',
      disciplina: '',
      horario: '',
      obs: 'Sala livre'
    };

    setLabs([...labs, novoObjeto]);
    setNovoNome('');
    setMostrarModalNovoLab(false);
  }

  function acaoBotaoLab(lab: Laboratorio) {
    if (lab.status === 'ocupado') {
      const listaAtualizada = labs.map((l) => {
        if (l.id === lab.id) {
          return { ...l, status: 'livre' as const, professor: '', disciplina: '', horario: '', obs: 'Sala livre' };
        }
        return l;
      });
      setLabs(listaAtualizada);
    } else {
      setLabSelecionadoId(lab.id);
      setProfInput('');
      setDiscInput('');
      setHorarioInput('');
      setObsInput('');
    }
  }

  function salvarOcupacao(e: FormEvent) {
    e.preventDefault();
    const listaAtualizada = labs.map((l) => {
      if (l.id === labSelecionadoId) {
        return {
          ...l,
          status: 'ocupado' as const,
          professor: profInput,
          disciplina: discInput,
          horario: horarioInput,
          obs: obsInput
        };
      }
      return l;
    });

    setLabs(listaAtualizada);
    setLabSelecionadoId(null);
  }

  function excluirLab(id: number) {
    const listaFiltrada = labs.filter((l) => l.id !== id);
    setLabs(listaFiltrada);
  }

  // ESTILOS VISUAIS EMBUTIDOS
  const styles: { [key: string]: CSSProperties } = {
    main: {
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      boxSizing: 'border-box'
    },
    cardLogin: {
      backgroundColor: '#1e293b',
      padding: '32px',
      borderRadius: '16px',
      border: '1px solid #334155',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
    },
    btnBlue: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      width: '100%',
      fontSize: '14px',
      transition: 'background-color 0.2s'
    },
    btnGray: {
      backgroundColor: '#334155',
      color: '#ffffff',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      width: '100%',
      fontSize: '14px'
    },
    btnRed: {
      backgroundColor: '#dc2626',
      color: '#ffffff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '12px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      backgroundColor: '#0f172a',
      border: '1px solid #334155',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '14px',
      boxSizing: 'border-box',
      outline: 'none'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: '#1e293b',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #334155',
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '16px',
      width: '100%',
      maxWidth: '900px'
    },
    labCard: {
      backgroundColor: '#1e293b',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    badgeLivre: {
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      color: '#34d399',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    badgeOcupado: {
      backgroundColor: 'rgba(244, 63, 94, 0.2)',
      color: '#fb7185',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    }
  };

  return (
    <main style={styles.main}>
      
      {/* 1. TELA DE LOGIN */}
      {tipoUsuario === '' && (
        <div style={styles.cardLogin}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#60a5fa' }}>ScopeLab</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Escolha o seu tipo de acesso:</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={logarComoAluno} style={styles.btnGray}>
              Entrar como Aluno / Visitante
            </button>

            <button onClick={() => setMostrarModalSenha(true)} style={styles.btnBlue}>
              Entrar como Representante
            </button>

            <button
              onClick={() => setMostrarCreditos(true)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', marginTop: '8px' }}
            >
              Desenvolvedores do Projeto
            </button>
          </div>
        </div>
      )}

      {/* 2. PAINEL PRINCIPAL */}
      {tipoUsuario !== '' && (
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '16px 24px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>ScopeLab - Painel</h1>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                Logado como: <strong style={{ color: '#60a5fa', textTransform: 'uppercase' }}>{tipoUsuario}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setMostrarCreditos(true)} style={{ ...styles.btnGray, padding: '8px 12px', fontSize: '12px', width: 'auto' }}>
                Créditos
              </button>
              {tipoUsuario === 'representante' && (
                <button onClick={() => setMostrarModalNovoLab(true)} style={{ ...styles.btnBlue, padding: '8px 12px', fontSize: '12px', width: 'auto' }}>
                  + Criar Novo Lab
                </button>
              )}
              <button onClick={deslogar} style={styles.btnRed}>
                Sair
              </button>
            </div>
          </header>

          <div style={styles.grid}>
            {labs.map((lab) => (
              <div key={lab.id} style={styles.labCard}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{lab.nome}</h2>
                    <span style={lab.status === 'livre' ? styles.badgeLivre : styles.badgeOcupado}>
                      {lab.status}
                    </span>
                  </div>

                  {lab.status === 'ocupado' ? (
                    <div style={{ fontSize: '13px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px', margin: '12px 0' }}>
                      <p style={{ margin: 0 }}><strong>Prof:</strong> {lab.professor}</p>
                      <p style={{ margin: 0 }}><strong>Disciplina:</strong> {lab.disciplina}</p>
                      <p style={{ margin: 0 }}><strong>Horário:</strong> {lab.horario}</p>
                      <p style={{ margin: 0 }}><strong>Obs:</strong> {lab.obs}</p>
                    </div>
                  ) : (
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '16px 0' }}>Laboratório disponível para uso.</p>
                  )}
                </div>

                {tipoUsuario === 'representante' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    <button onClick={() => acaoBotaoLab(lab)} style={{ ...styles.btnBlue, padding: '8px', fontSize: '12px' }}>
                      {lab.status === 'ocupado' ? 'Liberar Sala' : 'Ocupar Sala'}
                    </button>
                    <button onClick={() => excluirLab(lab.id)} style={{ ...styles.btnGray, padding: '6px', fontSize: '12px', backgroundColor: '#475569' }}>
                      Excluir Lab
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL CRÉDITOS */}
      {mostrarCreditos && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#60a5fa', textAlign: 'center', margin: 0 }}>Desenvolvedores</h2>
            <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <p style={{ margin: 0 }}>• Murillo Bordignon Castilho Rodrigues Luricy</p>
              <p style={{ margin: 0 }}>• Victória Bordignon Castilho Rodrigues Luricy</p>
            </div>
            <button onClick={() => setMostrarCreditos(false)} style={styles.btnBlue}>Fechar</button>
          </div>
        </div>
      )}

      {/* MODAL SENHA */}
      {mostrarModalSenha && (
        <div style={styles.modalOverlay}>
          <form onSubmit={tentarLogarRepresentante} style={styles.modalContent}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Senha do Representante</h2>
            <input
              type="password"
              placeholder="Digite 123"
              value={senhaInput}
              onChange={(e) => setSenhaInput(e.target.value)}
              style={styles.input}
              autoFocus
            />
            {erroSenha && <p style={{ color: '#f87171', fontSize: '12px', margin: 0 }}>{erroSenha}</p>}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="button" onClick={() => setMostrarModalSenha(false)} style={{ ...styles.btnGray, width: 'auto', padding: '8px 16px' }}>Cancelar</button>
              <button type="submit" style={{ ...styles.btnBlue, width: 'auto', padding: '8px 16px' }}>Entrar</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL NOVO LAB */}
      {mostrarModalNovoLab && (
        <div style={styles.modalOverlay}>
          <form onSubmit={adicionarLab} style={styles.modalContent}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Criar Novo Laboratório</h2>
            <input
              type="text"
              placeholder="Ex: Lab 04"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              style={styles.input}
              required
              autoFocus
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="button" onClick={() => setMostrarModalNovoLab(false)} style={{ ...styles.btnGray, width: 'auto', padding: '8px 16px' }}>Cancelar</button>
              <button type="submit" style={{ ...styles.btnBlue, width: 'auto', padding: '8px 16px' }}>Cadastrar</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL OCUPAR */}
      {labSelecionadoId !== null && (
        <div style={styles.modalOverlay}>
          <form onSubmit={salvarOcupacao} style={styles.modalContent}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Ocupar Laboratório</h2>
            <input type="text" placeholder="Nome do Professor" value={profInput} onChange={(e) => setProfInput(e.target.value)} style={styles.input} required />
            <input type="text" placeholder="Nome da Disciplina" value={discInput} onChange={(e) => setDiscInput(e.target.value)} style={styles.input} required />
            <input type="text" placeholder="Horário (ex: 07:30 - 09:10)" value={horarioInput} onChange={(e) => setHorarioInput(e.target.value)} style={styles.input} required />
            <input type="text" placeholder="Observação" value={obsInput} onChange={(e) => setObsInput(e.target.value)} style={styles.input} />

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="button" onClick={() => setLabSelecionadoId(null)} style={{ ...styles.btnGray, width: 'auto', padding: '8px 16px' }}>Cancelar</button>
              <button type="submit" style={{ ...styles.btnBlue, width: 'auto', padding: '8px 16px' }}>Salvar Dados</button>
            </div>
          </form>
        </div>
      )}

    </main>
  );
}
