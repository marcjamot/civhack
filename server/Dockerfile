FROM golang:1.15-alpine AS builder

RUN apk update
RUN apk add --no-cache git openssh

RUN mkdir -p /opt/civhack
WORKDIR /opt/civhack

COPY go.mod go.sum ./
RUN go mod download

COPY . .
WORKDIR /opt/civhack/cmd/civhack
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -tags netgo -ldflags '-w -extldflags "-static"' -o /opt/civhack/bin/civhack

FROM alpine
COPY --from=builder /opt/civhack/bin/civhack /opt/civhack/bin/civhack
WORKDIR /opt/civhack
CMD /opt/civhack/bin/civhack
