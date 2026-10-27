# Registos de Atualizações e Tarefas - ScopeLab

Este documento contém o histórico de modificações, refatorações e correções técnicas realizadas no projeto para garantir o funcionamento completo do sistema.

---

### [20/10/2026] - Reestruturação e Correção de Erros de Execução
**Responsável:** Murillo Bordignon Castilho Rodrigues Luricy

- **Migração de Arquitetura:** Remoção da estrutura legada com Express/`server.js` em prol da unificação do projeto no diretório `app/` do Next.js.
- **Correção de JSX:** Substituição de atributos nativos do HTML (`class=`) por convenções do React (`className=`) no arquivo `app/page.tsx` para eliminar alertas e quebras de renderização no console.
- **Padronização Visual:** Remoção de emojis e caracteres especiais da interface por solicitação do design do sistema.

---

### [21/10/2026] - Refatoração do Fluxo de Autenticação
**Responsável:** Victória Bordignon Castilho Rodrigues Luricy

- **Substituição de Prompts Nativos:** Resolução do erro de execução `prompt() is not supported` provocado pelo Turbopack/Next.js.
- **Implementação do Modal de Login:** Criação de um modal customizado em React com validação de senha (`123`) para o acesso do modo Representante.
- **Ajustes de Estado (`useState`):** Organização das variáveis de estado para alternar dinamicamente entre os níveis de acesso (Aluno/Visitante e Representante).

---

### [22/10/2026] - Implementação do CRUD: Ocupação de Laboratórios
**Responsável:** Murillo Bordignon Castilho Rodrigues Luricy

- **Atualização de Status (Update):** Criação da lógica para alternar o estado do laboratório entre *livre* e *ocupado*.
- **Modal de Formulário:** Desenvolvimento do formulário para preenchimento de informações sobre as aulas (Professor, Disciplina, Horário e Observações).
- **Limpeza Automática de Dados:** Implementação do reset de campos ao libertar uma sala previamente ocupada.

---

### [23/10/2026] - Implementação do CRUD: Gerenciamento de Salas
**Responsável:** Victória Bordignon Castilho Rodrigues Luricy

- **Criação de Registos (Create):** Desenvolvimento do modal para cadastro dinâmico de novos laboratórios no sistema.
- **Exclusão de Registos (Delete):** Criação da função de remoção de laboratórios exclusivos para o perfil de Representante.
- **Ajustes de Grid:** Configuração do Tailwind CSS para adaptar a exibição dos cards dinamicamente conforme novos laboratórios são criados ou removidos.

---

### [24/10/2026] - Simplificação de Código e Nível Técnico
**Responsável:** Murillo Bordignon Castilho Rodrigues Luricy

- **Refatoração do Código:** Simplificação das funções avançadas de TypeScript para JavaScript/React idiomático (`function` tradicionais e nomes de variáveis em português).
- **Tratamento de Validações:** Substituição dos `alert()` nativos por mensagens de erro embutidas nos próprios componentes formulários.

---

### [25/10/2026] - Seção de Identificação e Créditos
**Responsável:** Victória Bordignon Castilho Rodrigues Luricy

- **Modal de Créditos:** Criação do componente modal para exibição dos nomes dos desenvolvedores do projeto.
- **Botões de Acesso:** Adição dos atalhos na tela de autenticação e no cabeçalho do painel principal para visualização das informações dos alunos.

---

### [26/10/2026] - Testes Finais, Otimização e Validação
**Responsáveis:** Murillo Bordignon & Victória Bordignon

- **Validação de Responsividade:** Testes de interface para telas de diferentes resoluções usando as classes do Tailwind CSS.
- **Revisão de Código:** Verificação final do fluxo de dados para garantir que todas as quatro operações do CRUD funcionam sem erros no console.
- **Documentação:** Finalização e organização do arquivo `TASK.md` para entrega.
