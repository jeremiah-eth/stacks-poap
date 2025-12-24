;; stacks-poap
;; SIP-009 Compliant NFT Contract

(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

(define-non-fungible-token poap-badge uint)

(define-data-var last-token-id uint u0)

(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))

(define-read-only (get-last-token-id)
    (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
    (ok none)
)

(define-read-only (get-owner (token-id uint))
    (ok (nft-get-owner? poap-badge token-id))
)

(define-public (transfer
        (token-id uint)
        (sender principal)
        (recipient principal)
    )
    (begin
        (asserts! (is-eq tx-sender sender) err-not-token-owner)
        (asserts! (is-eq (some sender) (nft-get-owner? poap-badge token-id))
            err-not-token-owner
        )
        (nft-transfer? poap-badge token-id sender recipient)
    )
)

(define-public (mint)
    (let ((token-id (+ (var-get last-token-id) u1)))
        (try! (nft-mint? poap-badge token-id tx-sender))
        (var-set last-token-id token-id)
        (ok token-id)
    )
)
