export GIT_PS1_SHOWCOLORHINTS=1
source "/usr/lib/git-core/git-sh-prompt"

PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:$(__git_ps1 "[%s]:")\[\033[01;34m\]\w\[\033[00m\]\$ '

alias ..="cd .."
alias la="ls -la"
alias ls="ls --color=auto --group-directories-first -h --literal"

export PROMPT_COMMAND="history -a"
export HISTCONTROL="erasedups:ignoreboth"
export HISTFILE="/root/history.d/.bash_history"
export HISTFILESIZE=-1
export HISTSIZE=-1

bind '"\e[A": history-search-backward'
bind '"\e[B": history-search-forward'

bind "set colored-completion-prefix on"
bind "set completion-ignore-case on"
bind "set completion-map-case on"

shopt -s autocd
shopt -s cdspell
shopt -s dirspell
shopt -s xpg_echo
shopt -s histappend
shopt -s cmdhist
