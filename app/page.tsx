'use client';

import { useState, FormEvent } from 'react';

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
    { id: 1, nome: 'Lab 01', status: 'ocupado', professor: 'Prof. Carlos', disciplina: 'Programação Web', horario: '07:30 - 09:10', obs: 'Trazer notebook' },
    { id: 2, nome: 'Lab 02', status: 'livre', professor: '', disciplina: '', horario: '', obs: 'Sala livre' },
    { id: 3, nome: 'EAD', status: 'ocupado', professor: 'Profª. Fernanda', disciplina: 'Banco de Dados', horario: '09:30 - 11:10', obs: 'Aula prática' }
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

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center font-sans relative">
      
      {/* 1. TELA DE LOGIN */}
      {tipoUsuario === '' && (
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md text-center shadow-2xl">
          <h1 className="text-2xl font-bold mb-2">ScopeLab</h1>
          <p className="text-slate-400 text-sm mb-6">Escolha o seu tipo de acesso:</p>

          <div className="flex flex-col gap-4">
            <button
              onClick={logarComoAluno}
              className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg font-semibold text-left transition"
            >
              Entrar como Aluno / Visitante
            </button>

            <button
              onClick={() => setMostrarModalSenha(true)}
              className="bg-blue-600 hover:bg-blue-500 p-4 rounded-lg font-semibold text-left transition"
            >
              Entrar como Representante
            </button>

            <button
              onClick={() => setMostrarCreditos(true)}
              className="text-xs text-slate-400 hover:text-white pt-2 underline transition"
            >
              Desenvolvedores do Projeto
            </button>
          </div>
        </div>
      )}

      {/* 2. PAINEL PRINCIPAL (ALUNO E REPRESENTANTE) */}
      {tipoUsuario !== '' && (
        <div className="w-full max-w-4xl">
          <header className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6">
            <div>
              <h1 className="text-xl font-bold">ScopeLab - Painel</h1>
              <p className="text-xs text-slate-400">
                Logado como: <strong className="text-blue-400 uppercase">{tipoUsuario}</strong>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setMostrarCreditos(true)}
                className="bg-slate-700 hover:bg-slate-600 text-xs px-3 py-2 rounded-lg"
              >
                Créditos
              </button>
              {tipoUsuario === 'representante' && (
                <button
                  onClick={() => setMostrarModalNovoLab(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-xs px-3 py-2 rounded-lg font-bold"
                >
                  + Criar Novo Lab
                </button>
              )}
              <button
                onClick={deslogar}
                className="bg-red-600 hover:bg-red-500 text-xs px-3 py-2 rounded-lg font-bold"
              >
                Sair
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {labs.map((lab) => (
              <div key={lab.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-bold text-lg">{lab.nome}</h2>
                    <span
                      className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                        lab.status === 'livre' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {lab.status}
                    </span>
                  </div>

                  {lab.status === 'ocupado' ? (
                    <div className="text-xs space-y-1 text-slate-300 my-3">
                      <p><strong>Professor:</strong> {lab.professor}</p>
                      <p><strong>Disciplina:</strong> {lab.disciplina}</p>
                      <p><strong>Horário:</strong> {lab.horario}</p>
                      <p><strong>Obs:</strong> {lab.obs}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 my-4">Laboratório disponível para uso.</p>
                  )}
                </div>

                {tipoUsuario === 'representante' && (
                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      onClick={() => acaoBotaoLab(lab)}
                      className="bg-blue-600 hover:bg-blue-500 text-xs py-2 rounded font-semibold"
                    >
                      {lab.status === 'ocupado' ? 'Liberar Sala' : 'Ocupar Sala'}
                    </button>
                    <button
                      onClick={() => excluirLab(lab.id)}
                      className="bg-slate-700 hover:bg-red-600 text-xs py-1.5 rounded"
                    >
                      Excluir Lab
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* JANELA MODAL: CRÉDITOS */}
      {mostrarCreditos && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 w-full max-w-md space-y-4 shadow-2xl text-center">
            <h2 className="font-bold text-xl text-blue-400">Desenvolvedores do ScopeLab</h2>
            <p className="text-xs text-slate-400">Projeto desenvolvido pelos alunos:</p>
            
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-sm space-y-2 text-left">
              <p className="font-semibold text-slate-200">• Murillo Bordignon Castilho Rodrigues Luricy</p>
              <p className="font-semibold text-slate-200">• Victória Bordignon Castilho Rodrigues Luricy</p>
            </div>

            <button
              onClick={() => setMostrarCreditos(false)}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-xs font-bold w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* JANELA MODAL: SENHA DO REPRESENTANTE */}
      {mostrarModalSenha && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={tentarLogarRepresentante} className="bg-slate-800 p-6 rounded-xl border border-slate-700 w-full max-w-sm space-y-4">
            <h2 className="font-bold text-lg">Senha do Representante</h2>
            <input
              type="password"
              placeholder="Digite 123"
              value={senhaInput}
              onChange={(e) => setSenhaInput(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
              autoFocus
            />
            {erroSenha && <p className="text-red-400 text-xs">{erroSenha}</p>}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setMostrarModalSenha(false)}
                className="bg-slate-700 px-3 py-1.5 rounded text-xs"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-blue-600 px-3 py-1.5 rounded text-xs font-bold">
                Entrar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* JANELA MODAL: ADICIONAR NOVO LAB */}
      {mostrarModalNovoLab && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={adicionarLab} className="bg-slate-800 p-6 rounded-xl border border-slate-700 w-full max-w-sm space-y-4">
            <h2 className="font-bold text-lg">Criar Novo Laboratório</h2>
            <input
              type="text"
              placeholder="Ex: Lab 04"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
              required
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setMostrarModalNovoLab(false)}
                className="bg-slate-700 px-3 py-1.5 rounded text-xs"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-blue-600 px-3 py-1.5 rounded text-xs font-bold">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* JANELA MODAL: PREENCHER DADOS DA AULA */}
      {labSelecionadoId !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={salvarOcupacao} className="bg-slate-800 p-6 rounded-xl border border-slate-700 w-full max-w-md space-y-3">
            <h2 className="font-bold text-lg">Ocupar Laboratório</h2>

            <input
              type="text"
              placeholder="Nome do Professor"
              value={profInput}
              onChange={(e) => setProfInput(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
              required
            />
            <input
              type="text"
              placeholder="Nome da Disciplina"
              value={discInput}
              onChange={(e) => setDiscInput(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
              required
            />
            <input
              type="text"
              placeholder="Horário (ex: 07:30 - 09:10)"
              value={horarioInput}
              onChange={(e) => setHorarioInput(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
              required
            />
            <input
              type="text"
              placeholder="Observação"
              value={obsInput}
              onChange={(e) => setObsInput(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLabSelecionadoId(null)}
                className="bg-slate-700 px-3 py-1.5 rounded text-xs"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-blue-600 px-3 py-1.5 rounded text-xs font-bold">
                Salvar Dados
              </button>
            </div>
          </form>
        </div>
      )}

    </main>
  );
}
