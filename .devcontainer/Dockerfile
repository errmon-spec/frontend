FROM node:20-bookworm-slim

SHELL ["/bin/bash", "-o", "errexit", "-o", "pipefail", "-o", "nounset", "-c"]

# hadolint ignore=DL3008
RUN apt-get update -qq \
    && apt-get install --no-install-recommends -y \
        ca-certificates \
        curl \
        git \
        gnupg2 \
        ssh \
        unzip \
        vim \
    && rm -rf /var/lib/apt/lists/*

ENV HADOLINT_VERSION="2.12.0"
RUN case "$(dpkg --print-architecture)" in \
      arm64) HADOLINT_ARCH="arm64" ;; \
      *) HADOLINT_ARCH="x86_64" ;; \
    esac \
    && curl -fsSL "https://github.com/hadolint/hadolint/releases/download/v${HADOLINT_VERSION}/hadolint-Linux-${HADOLINT_ARCH}" \
            --output /usr/bin/hadolint \
    && chmod +x /usr/bin/hadolint

RUN curl -L https://fly.io/install.sh | sh
ENV FLYCTL_INSTALL="/root/.fly"
ENV PATH="$FLYCTL_INSTALL/bin:$PATH"

COPY --link ./dotfiles/.bashrc /root/.bashrc

EXPOSE 4000

WORKDIR /app

CMD ["/bin/bash"]
